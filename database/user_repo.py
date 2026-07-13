class UserRepository:

    def create_user(
        self,
        email: str,
        password_hash: str,
        first_name: str,
        last_name: str,
        role: str = "viewer"
    ):
        ...

    def find_by_email(self, email: str):
        ...

    def find_by_id(self, user_id: int):
        ...

    def update_password(self, user_id: int, password_hash: str):
        ...

    def deactivate_user(self, user_id: int):
        ...

    def activate_user(self, user_id: int):
        ...

    def list_users(self):
        ...