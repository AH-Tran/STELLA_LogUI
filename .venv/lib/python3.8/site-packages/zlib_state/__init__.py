import io
import os
if hasattr(os, 'add_dll_directory'):
    # On windows, need to be sure that zlib is in the dll directory path before loading ext module
    # In particular, needed for python 3.8+ on Windows
    with os.add_dll_directory(os.environ.get("ZLIB_HOME", "C:/Program Files/zlib/bin")):
        from _zlib_state import Decompressor
else:
    from _zlib_state import Decompressor


class GzipStateFileBase(io.RawIOBase):
    def __init__(self, path, keep_last_state=False, on_block_boundary=None):
        if isinstance(path, str):
            self.file = open(path, 'rb')
        else:
            self.file = path
        self.decomp = Decompressor(32 + 15)
        self.last_state = None
        self.last_state_pos = None
        self.keep_last_state = keep_last_state
        self.on_block_boundary = on_block_boundary

    def zseek(self, pos, state):
        self.file.seek(pos)
        self.decomp = Decompressor(-15)
        self.decomp.set_state(state[0], state[1], state[2])

    def readinto(self, buf):
        if len(buf) == 1:
            raise ValueError()
        count = 0
        while count == 0 and not self.decomp.eof():
            needed_bytes = self.decomp.needs_input()
            if needed_bytes > 0:
                # decompressor needs more input
                self.decomp.feed_input(self.file.read(needed_bytes))
            count += self.decomp.read(outbytes=buf)
            if self.keep_last_state and self.decomp.block_boundary():
                self.last_state = self.decomp.get_state()
                self.last_state_pos = self.decomp.total_in()
                if self.on_block_boundary:
                    self.on_block_boundary(count)
        return count

    def read(self, size=-1):
        if size == 1:
            raise ValueError()
        if size == -1:
            return super().read(size) # reads entire file
        result = None
        while not result and not self.decomp.eof():
            needed_bytes = self.decomp.needs_input()
            if needed_bytes > 0:
                # decompressor needs more input
                self.decomp.feed_input(self.file.read(needed_bytes))
            result = self.decomp.read(outsize=size)
            if self.decomp.block_boundary():
                self.last_state = self.decomp.get_state()
                self.last_state_pos = self.decomp.total_in()
                if self.on_block_boundary:
                    self.on_block_boundary(len(result))
        return result

    def eof(self):
        return self.decomp.eof()

    def __bool__(self):
        return not self.decomp.eof()

    def readable(self):
        return not self.decomp.eof()

    def fileno(self):
        return self.file.fileno()

    def seek(self):
        raise NotImplementedError()

    def truncate(self):
        raise NotImplementedError()

    def close(self):
        super().close()
        self.file.close()


class GzipStateFile(io.BufferedIOBase):
    def __init__(self, path, keep_last_state=False, buffer_size=io.DEFAULT_BUFFER_SIZE):
        self.raw = GzipStateFileBase(path, keep_last_state, on_block_boundary=self.on_block_boundary)
        self.buffer_size = buffer_size
        self.buffer = bytearray(buffer_size)
        self.buffer_start = 0
        self.buffer_stop = 0
        self.output_pos = 0
        self.last_state_output_pos = 0

    def detach(self):
        return self.raw

    def read(self, count=-1):
        if count == -1:
            return self._readall()
        result = b''
        while len(result) < count and not self.raw.eof():
            result += self.read1(count - len(result))
        return result

    def _readall(self):
        result = b''
        while not self.raw.eof():
            result += self.read(self.buffer_size)
        return result

    def read1(self, count=-1):
        start, stop = self.buffer_start, self.buffer_stop
        if start == stop:
            # buffer empty
            size = self.raw.readinto(self.buffer)
            self.buffer_start, self.buffer_stop = start, stop = 0, size
        size = stop - start
        if count != -1: # indicates to read as much as possible
            size = min(size, count)
        result = self.buffer[start:start+size]
        self.buffer_start += size
        self.output_pos += size
        return result

    def readinto(self, buf):
        count = 0
        while count < len(buf) and not self.raw.eof():
            count += self.readinto1(buf[count:])
        return count

    def readinto1(self, buf):
        start, stop = self.buffer_start, self.buffer_stop
        if start == stop:
            # buffer empty
            size = self.raw.readinto(self.buffer)
            self.buffer_start, self.buffer_stop = start, stop = 0, size
        size = min(stop - start, count)
        buf[:size] = self.buffer[start:start+size]
        self.buffer_start += size
        self.output_pos += size
        return size

    def readline(self):
        if self.buffer_start != self.buffer_stop:
            try:
                idx = self.buffer[self.buffer_start:self.buffer_stop].index(b'\n')
                # line found in buffer. Use that and advance buffer pointers
                line = self.buffer[self.buffer_start:self.buffer_start+idx+1]
                self.buffer_start += idx + 1
                self.output_pos += idx + 1
                return line
            except ValueError:
                # line break not found in remaining buffer. Start with the remaining buffer and carry on
                line = self.buffer[self.buffer_start:self.buffer_stop]
                self.buffer_start, self.buffer_stop = 0, 0 # buffer consumed
                self.output_pos += len(line)
        else:
            line = b''
        while not line.endswith(b'\n') and not self.raw.eof():
            chunk = self.read1(self.buffer_size)
            try:
                idx = chunk.index(b'\n')
                self.buffer_start -= (len(chunk) - idx - 1) # move back the buffer cursor to the end of the line
                self.output_pos -= (len(chunk) - idx - 1)
                chunk = chunk[:idx+1]
            except ValueError:
                pass # \n not found, that's OK
            line += chunk
        return line

    def peek(self, count=-1):
        start, stop = self.buffer_start, self.buffer_stop
        if start == stop:
            # buffer empty
            size = self.raw.readinto(self.buffer)
            self.buffer_start, self.buffer_stop = start, stop = 0, size
        size = stop - start
        if count != -1: # indicates to read as much as possible
            size = min(size, count)
        result = self.buffer[start:start+size]
        # do NOT advance the start pointer
        return result

    def zseek(self, pos, state):
        self.raw.zseek(pos, state)
        self.buffer_start, self.buffer_stop = 0, 0

    def eof(self):
        return self.raw.eof()

    def __getattr__(self, key):
        if key in ('last_state', 'last_state_pos'):
            return getattr(self.raw, key)
        return getattr(super(), key)

    def close(self):
        super().close()
        self.raw.close()
        self.buffer = None

    def on_block_boundary(self, new_data_count):
        self.last_state_output_pos = self.output_pos + new_data_count
