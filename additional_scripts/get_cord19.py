import pyterrier as pt
print("pt.init")
pt.init()
print("get dataset")
dataset = pt.get_dataset('irds:cord19')
# Index cord19
print("create indexer")
indexer = pt.IterDictIndexer('./indices2/cord19')
print("create index ref")
index_ref = indexer.index(dataset.get_corpus_iter(), fields=['title', 'doi', 'date', 'abstract'])
