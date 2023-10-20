import React, { useMemo, useState } from "react";
import classes from "@/styles/homes/homes.module.css";
import db from "@/data/db.json";
import { SingleCardItem } from "@/models/modules/SingleCardModel";
import SingleCard from "@/components/modules/SingleCard";
import { HomesSortData } from "@/models/pages/homes/HomesModel";
import { useRouter } from "next/router";

function Homes() {
  const router = useRouter();

  const PAGE_COUNT = 6;

  // States
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(Number(router.query?.page) || 1);
  const [pageCount, setPageCount] = useState<number>(0);

  // Change States
  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(() => event.target.value || "");
  };
  const onChangeSortSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(() => event.target.value || "");
  };

  // Pagination Handler
  const onPagination = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    page: number
  ) => {
    event.preventDefault();
    setPage(() => page);
    router.push(`/homes?page=${page}`);
  };

  // Memo
  const getHomesData = useMemo(() => {
    let temp = [...db.homes];
    if (search) {
      temp = temp.filter((itemHome: SingleCardItem) =>
        itemHome.title.includes(search)
      );
    }
    if (sort) {
      switch (sort) {
        case HomesSortData.price:
          temp = temp.sort(
            (item1: SingleCardItem, item2: SingleCardItem) =>
              item1.price - item2.price
          );
          break;
        case HomesSortData.roomCount:
          temp = temp.sort(
            (item1: SingleCardItem, item2: SingleCardItem) =>
              item1.roomCount - item2.roomCount
          );
          break;
        case HomesSortData.meterage:
          temp = temp.sort(
            (item1: SingleCardItem, item2: SingleCardItem) =>
              item1.meterage - item2.meterage
          );
          break;
      }
    }

    setPageCount(() => Math.ceil(temp.length / PAGE_COUNT));
    return temp
      .slice((page - 1) * PAGE_COUNT, page * PAGE_COUNT)
      .map((itemHome: SingleCardItem) => (
        <SingleCard item={itemHome} key={itemHome.id} />
      ));
  }, [search, sort, page]);

  return (
    <div className={classes.homeSection} id="houses">
      <div className={classes.homeFilterSearch}>
        <div className={classes.homeFilter}>
          <select onChange={onChangeSortSelect} value={sort}>
            <option value="">انتخاب کنید</option>
            <option value={HomesSortData.price}>بر اساس قیمت</option>
            <option value={HomesSortData.roomCount}>بر اساس تعداد اتاق</option>
            <option value={HomesSortData.meterage}>بر اساس اندازه</option>
          </select>
        </div>
        <div className={classes.homeSearch}>
          <input
            type="text"
            value={search}
            onChange={onChangeSearchInput}
            placeholder="جستجو کنید"
          />
        </div>
      </div>
      <div className={classes.homes}>{getHomesData}</div>
      <ul className={classes.pagination__list}>
        {Array.from({ length: pageCount }).map((_: any, index: number) => (
          <li
            className={`${classes.pagination__item} ${
              page === index + 1 ? classes.active : ""
            }`}
            key={index}
            onClick={(event) => onPagination(event, index + 1)}
          >
            <a href={`?page=${index + 1}`}>{index + 1}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homes;
