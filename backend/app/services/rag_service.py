from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

vector_db = None
embeddings = None


def get_embeddings():
    global embeddings

    if embeddings is None:
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

    return embeddings


def build_vector_store(text):
    global vector_db

    if not text or not text.strip():
        raise ValueError("No text extracted from the PDF.")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = splitter.split_text(text)
    chunks = [chunk.strip() for chunk in chunks if chunk.strip()]

    if not chunks:
        raise ValueError("No valid text chunks were created.")

    vector_db = FAISS.from_texts(
        chunks,
        get_embeddings()
    )

    return len(chunks)


def search_context(question):
    global vector_db

    if vector_db is None:
        return ""

    docs = vector_db.similarity_search(
        question,
        k=3
    )

    return "\n\n".join(doc.page_content for doc in docs)