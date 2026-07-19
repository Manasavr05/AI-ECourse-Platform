from langchain_text_splitters import RecursiveCharacterTextSplitter

chunks_store = []


def build_vector_store(text):
    global chunks_store

    if not text or not text.strip():
        raise ValueError("No text extracted from the PDF.")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=700,
        chunk_overlap=100
    )

    chunks = splitter.split_text(text)
    chunks_store = [chunk.strip() for chunk in chunks if chunk.strip()]

    return len(chunks_store)


def search_context(question):
    global chunks_store

    if not chunks_store:
        return ""

    question_words = set(question.lower().split())

    scored = []

    for chunk in chunks_store:
        score = sum(
            1 for word in question_words
            if word in chunk.lower()
        )
        scored.append((score, chunk))

    scored.sort(reverse=True)

    top_chunks = [
        chunk
        for score, chunk in scored[:3]
        if score > 0
    ]

    return "\n\n".join(top_chunks)