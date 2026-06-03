from db.db import (
    document_collection
)


def create_document(
    user_id,
    document_name,
    document_type
):

    existing = (
        document_collection.find_one(
            {
                "user_id":
                user_id,

                "document_name":
                document_name
            }
        )
    )

    if existing:
        return

    document_collection.insert_one(
        {
            "user_id":
            user_id,

            "document_name":
            document_name,

            "document_type":
            document_type
        }
    )
    
def get_documents(
    user_id
):

    documents = (
        document_collection.find(
            {
                "user_id":
                user_id
            },
            {
                "_id": 0
            }
        )
    )

    return list(
        documents
    )