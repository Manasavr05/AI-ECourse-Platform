from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vector_db = None


def build_vector_store(text):
    global vector_db

    # Check for empty text
    if not text or not text.strip():
        raise ValueError("No text extracted from the PDF.")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = splitter.split_text(text)
    print("Chunks:", len(chunks))

    # Remove empty chunks
    chunks = [chunk.strip() for chunk in chunks if chunk.strip()]

    if len(chunks) == 0:
        raise ValueError("No valid text chunks were created.")

    vector_db = FAISS.from_texts(
        chunks,
        embeddings
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