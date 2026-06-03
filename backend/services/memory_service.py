from db.db import (
    conversation_collection
)


def add_message(
    user_id,
    document_name,
    role,
    content
):

    conversation_collection.update_one(
        {
            "user_id":
            user_id,

            "document_name":
            document_name
        },
        {
            "$push": {
                "messages": {
                    "role": role,
                    "content": content
                }
            }
        },
        upsert=True
    )


def get_history(
    user_id,
    document_name
):

    print(
        "SEARCHING:",
        user_id,
        document_name
    )

    conversation = (
        conversation_collection.find_one(
            {
                "user_id":
                user_id,

                "document_name":
                document_name
            }
        )
    )

    print(
        "FOUND:",
        conversation
    )

    if not conversation:
        return []

    return conversation.get(
        "messages",
        []
    
    )


def clear_history(
    user_id,
    document_name
):

    conversation_collection.delete_one(
        {
            "user_id":
            user_id,

            "document_name":
            document_name
        }
    )