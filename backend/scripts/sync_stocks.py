import akshare as ak
from sqlalchemy import select

from app.db.session import Session, engine
from app.models.stock import Stock


def main() -> None:
    df = ak.stock_info_a_code_name()

    created_count = 0
    updated_count = 0

    with Session(engine) as session:
        for row in df.itertuples(index=False):
            code = str(row.code).strip()
            name = str(row.name).strip()

            statement = select(Stock).where(Stock.code == code)
            stock = session.scalars(statement).first()
            if stock is None:
                stock = Stock(code=code, name=name, exchange=infer_exchange(code))
                session.add(stock)
                created_count += 1
            else:
                stock.exchange = infer_exchange(code)
                stock.name = name
                updated_count += 1

        session.commit()

    print(f"同步完成：新增 {created_count} 条，更新 {updated_count} 条")


def infer_exchange(code: str) -> str | None:
    if code.startswith(("600", "601", "603", "605", "688")):
        return "SSE"
    if code.startswith(("000", "001", "002", "003", "300", "301")):
        return "SZSE"
    if code.startswith(("8", "4", "9")):
        return "BSE"
    return None


if __name__ == "__main__":
    main()
