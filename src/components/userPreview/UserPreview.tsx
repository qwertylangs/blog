import { Avatar } from "@mui/material";
import styles from "./UserPreview.module.scss";
import { ArticleCreator } from "@src/types";

interface UserPreviewProps extends ArticleCreator {
  createdAt?: string;
}

const UserPreview = ({ username, createdAt, image }: UserPreviewProps) => {
  if (!image) image = "https://static.productionready.io/images/smiley-cyrus.jpg";

  return (
    <div className={styles.user}>
      <div className={styles.infoWrapper}>
        <div className={styles.name}>{username}</div>
        {createdAt && <div className={styles.date}>{createdAt}</div>}
      </div>

      <Avatar alt={username} src={image} sx={{ width: 46, height: 46 }} />
    </div>
  );
};

export { UserPreview };
