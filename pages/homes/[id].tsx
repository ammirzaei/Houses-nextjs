import React from "react";
import classes from "@/styles/homes/ShowDetails.module.css";
import { useRouter } from "next/router";
import db from '@/data/db.json';
import { SingleCardItem } from "@/models/modules/SingleCardModel";

function ShowDetails() {
  const router = useRouter();
  const id = router.query.id;
  const itemHome = db.homes.find((itemHome:SingleCardItem)=> itemHome?.id === Number(id)); 
  if (!itemHome) return <></>;


  return (
    <div className={classes.homeDetails}>
      <div className={classes.homeDetailsTop}>
        <div className={classes.homeImg}>
          <img src={itemHome?.img} alt={itemHome?.title} />
        </div>
        <div className={classes.homeInterduce}>
          <div className={classes.homeTitle}>
            <h1>
              <span>{itemHome?.title}</span>
              <span>{itemHome?.price.toLocaleString()} میلیون تومان</span>
            </h1>
            <div className={classes.tags}>
              <span className={`${classes.tag} ${classes.greenTag}`}>ویژه</span>
              <span className={`${classes.tag} ${classes.brownTag}`}>
                برای اجاره
              </span>
            </div>
            <div className={classes.adrress}>آدرس : شیراز، میدان ارم</div>
          </div>
          <div className={classes.homeReview}>
            <div className={classes.homeReviewTop}>
              <h2>مرور کلی</h2>
              <p>
                <span>کد ملک : </span>
                <span>{itemHome?.code}</span>
              </p>
            </div>
            <ul className={classes.homeReviewBottom}>
              <li>
                <span>نوع ملک:  </span>
                <span>مغازه</span>
              </li>
              <li>
                <span>اتاق: </span>
                <span>{itemHome?.roomCount}</span>
              </li>
              <li>
                <span>متراژ</span>
                <span>{itemHome.meterage}</span>
              </li>
              <li>
                <span>سال ساخت</span>
                <span>1402</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.homeDetailsBottom}>
        <div className={classes.homeDetailsDescription}>
          <p>توضیحات</p>
          <p>
            {itemHome?.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
