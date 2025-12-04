from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from backend import models
from .schemas import GroceryItem, GroceryItemCreate, GroceryGroup, GroceryGroupCreate

from typing import List

router = APIRouter(
    prefix="/grocery",
    tags=["Grocery"]
)

@router.post("/create-group", response_model=GroceryGroup)
def create_group(group: GroceryGroupCreate, db: Session = Depends(get_db)):

    try:

        db_group = models.GroceryName(grocery_group_name=group.grocery_group_name)
        db.add(db_group)
        db.commit()
        db.refresh(db_group)

        for item in group.items:
            db_item = models.GroceryItems(
                name=item.name,
                quantity=item.quantity,
                group_id=db_group.id
            )
            db.add(db_item)

        db.commit()
        db.refresh(db_group)

        print("Data added successfully")

        return db_group
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/view-all", response_model=List[GroceryGroup])
def view_all(db: Session = Depends(get_db)):

    try:
        all_groceries = db.query(models.GroceryName).all()

        if not all_groceries:
            raise HTTPException(status_code=404, detail=str(e))
        
        return all_groceries

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/view-grocery/{get_id}", response_model=GroceryGroup)
def view_grocery_by_id(get_id: int, db: Session = Depends(get_db)):

    try:

        grocery = db.query(models.GroceryName).filter(models.GroceryName.id == get_id).first()

        if not grocery:
            raise HTTPException(status_code=404, detail="grocery not found")
        
        return grocery
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))