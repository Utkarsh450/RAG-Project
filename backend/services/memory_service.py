from db.db import (
    conversation_collection
)


def add_message(
    user_id,
    workspace_id,
    role,
    content
):

    conversation_collection.update_one(
        {
            "user_id": user_id,
            "workspace_id": workspace_id
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
    workspace_id
):

    print(
        "SEARCHING:",
        user_id,
        workspace_id
    )

    conversation = (
        conversation_collection.find_one(
            {
                "user_id": user_id,
                "workspace_id": workspace_id
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
    workspace_id
):

    conversation_collection.delete_one(
        {
            "user_id": user_id,
            "workspace_id": workspace_id
        }
    )