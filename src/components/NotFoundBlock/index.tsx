import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundInfo = () => {
	return (
		<div className={styles.root}>
			<span>🙁</span>
			<br />
			<h1>Ничего не найдено</h1>
			<p className={styles.description}>
				Данная страница отсутствует в нашей пиццерии
			</p>
		</div>
	);
};

export default NotFoundInfo;
