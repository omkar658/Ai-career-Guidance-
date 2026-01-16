"""
In-memory storage for when Supabase is not configured.
This allows the app to run for demonstration purposes.
"""

import json
import uuid
from typing import Dict, Any, List, Optional
from datetime import datetime

class MemoryStorage:
    """Simple in-memory storage to replace Supabase for demo purposes"""

    def __init__(self):
        self.user_profiles: Dict[str, Dict[str, Any]] = {}
        self.chat_history: Dict[str, List[Dict[str, Any]]] = {}

    def save_user_profile(self, user_id: str, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save user profile data"""
        # Generate a unique ID if not provided
        if 'id' not in profile_data:
            profile_data['id'] = str(uuid.uuid4())

        profile_data['user_id'] = user_id
        profile_data['created_at'] = datetime.now().isoformat()
        profile_data['updated_at'] = datetime.now().isoformat()
        self.user_profiles[user_id] = profile_data
        return profile_data

    def get_user_profile(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user profile data"""
        return self.user_profiles.get(user_id)

    def save_chat_message(self, user_id: str, message: str, response: str) -> Dict[str, Any]:
        """Save chat message and response"""
        if user_id not in self.chat_history:
            self.chat_history[user_id] = []

        chat_entry = {
            'user_id': user_id,
            'message': message,
            'response': response,
            'timestamp': datetime.now().isoformat()
        }

        self.chat_history[user_id].append(chat_entry)
        return chat_entry

    def get_chat_history(self, user_id: str) -> List[Dict[str, Any]]:
        """Get chat history for user"""
        return self.chat_history.get(user_id, [])

# Global instance
memory_storage = MemoryStorage()