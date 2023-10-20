import { SingleCardProps } from "@/models/modules/SingleCardModel";
import Link from "next/link";
import React from "react";

function SingleCard({
    item
}: SingleCardProps) {

  return (
    <div className="card">
      <img src={item.img} alt={item.title} className="card__img" />
      <h5 className="card__title">{item.title}</h5>
      <svg className="card__like">
        <use xlinkHref="img/sprite.svg#icon-heart-full"></use>
      </svg>
      <div className="card__details">
        <svg className="card__icon">
          <use xlinkHref="img/sprite.svg#icon-map-pin"></use>
        </svg>
        <p className="card__text">مالدیو</p>

        <svg className="card__icon">
          <use xlinkHref="img/sprite.svg#icon-profile-male"></use>
        </svg>
        <p className="card__text">{item.roomCount} اتاق</p>

        <svg className="card__icon">
          <use xlinkHref="img/sprite.svg#icon-expand"></use>
        </svg>
        <p className="card__text">{item.meterage} متر مربع</p>

        <svg className="card__icon">
          <use xlinkHref="img/sprite.svg#icon-key"></use>
        </svg>
        <p className="card__text">{item.price.toLocaleString()} میلیون تومان</p>
      </div>

      <Link href={`/homes/${item.id}`} className="btn btn-brown btn-card">
        مشاهده ملک
      </Link>
    </div>
  );
}

export default SingleCard;
