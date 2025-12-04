from pydantic import BaseModel
from typing import List

# Request Model
class GroceryItemCreate(BaseModel):
    name: str
    quantity: int


class GroceryGroupCreate(BaseModel):
    grocery_group_name: str
    items: List[GroceryItemCreate]


# Response Model
class GroceryItem(BaseModel):
    id: int
    name: str
    quantity: int
    group_id: int

    class Config:
        orm_mode = True


class GroceryGroup(BaseModel):
    id: int
    grocery_group_name: str
    items: List[GroceryItem]

    class Config:
        orm_mode = True