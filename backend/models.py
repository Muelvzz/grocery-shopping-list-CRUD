from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from .database import Base

class GroceryName(Base):
    __tablename__ = "grocery_name"

    id = Column(Integer, primary_key=True, index=True)
    grocery_group_name = Column(String, nullable=False, unique=True)

    items = relationship("GroceryItems", back_populates="group", cascade="all, delete")

class GroceryItems(Base):
    __tablename__ = "grocery_items"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("grocery_name.id"))
    name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)

    group = relationship("GroceryName", back_populates="items")