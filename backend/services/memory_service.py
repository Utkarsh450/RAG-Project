from db.db import (
    conversation_collection
)


def add_message(
    user_id,
    role,
    content
):

    conversation_collection.update_one(
        {
            "_id": user_id
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
    user_id
):

    conversation = (
        conversation_collection.find_one(
            {
                "_id": user_id
            }
        )
    )

    if not conversation:
        return []

    return conversation.get(
        "messages",
        []
    )


def clear_history(
    user_id
):

    conversation_collection.delete_one(
        {
            "_id": user_id
        }
    )