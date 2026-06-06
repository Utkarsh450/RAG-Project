from pymongo import MongoClient
import os

client = MongoClient(
    os.getenv("MONGO_URI")
)

try:
    client.admin.command("ping")
    print("✅ Connected to MongoDB")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")

db = client["rag_db"]

conversation_collection = db["conversations"]

user_collection = db["users"]
refresh_token_collection = (
    db["refresh_tokens"]
)
document_collection = (
    db["documents"]
)