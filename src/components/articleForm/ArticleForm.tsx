import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { ICreateArticleFields, ICreateArticleData } from "@src/types";
import styles from "./ArticleForm.module.scss";
import isEqual from "@utils/isEqual";

interface ArticleFormProps {
  isEditing?: boolean;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  isLoading?: boolean;
  onSave: (data: ICreateArticleData) => void;
}

const ArticleForm = ({
  title = "",
  description = "",
  body = "",
  tagList = [],
  isLoading,
  isEditing,
  onSave,
}: ArticleFormProps) => {
  const mapedTagList = tagList.map((tag) => ({ tag }));

  const { handleSubmit, control, watch } = useForm<ICreateArticleFields>({
    mode: "onChange",
    defaultValues: {
      title,
      description,
      body,
      tagList: mapedTagList,
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "tagList",
    control,
  });

  const onSubmit: SubmitHandler<ICreateArticleFields> = (fields) => {
    const tagsArr = fields.tagList.map((tag) => tag.tag).filter((tag) => tag);
    onSave({ ...fields, tagList: tagsArr });
  };

  const isSameUserData = isEqual(
    {
      title: watch("title"),
      description: watch("description"),
      body: watch("body"),
      tagList: watch("tagList").map((tag) => tag.tag),
    },
    {
      title,
      description,
      body,
      tagList,
    },
  );

  return (
    <section className={styles.articleForm}>
      <h2 className={styles.title}>
        {isEditing ? "Edit article" : "Create new article"}{" "}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
              maxLength: { value: 50, message: "Maximum length is 50" },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                fullWidth
                label="Title"
                variant="outlined"
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{
              required: "Short description is required",
              maxLength: { value: 100, message: "Maximum length is 100" },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                fullWidth
                label="Short description"
                variant="outlined"
                {...field}
              />
            )}
          />

          <Controller
            name="body"
            control={control}
            rules={{
              required: "Text is required",
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                fullWidth
                label="Text"
                variant="outlined"
                multiline
                rows={6}
                {...field}
              />
            )}
          />

          <div className={styles.tagsWrapper}>
            <div className={styles.tagsLabel}>Tags</div>
            <div className={styles.tagsList}>
              {fields.map((field, index) => (
                <div className={styles.tag} key={field.id}>
                  <Controller
                    name={`tagList.${index}.tag`}
                    control={control}
                    rules={{
                      required: "Tag is required",
                      maxLength: { value: 20, message: "Maximum length is 20" },
                    }}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <TextField
                        error={invalid}
                        helperText={error?.message}
                        label="Short description"
                        variant="outlined"
                        style={{ width: 300 }}
                        {...field}
                      />
                    )}
                  />

                  <Button
                    variant="outlined"
                    color="error"
                    style={{ width: 120, height: 54.5 }}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>

                  {fields.length - 1 === index && (
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ width: 120, height: 54.5, display: "inline-block" }}
                      onClick={() => append({ tag: "" })}
                    >
                      Add tag
                    </Button>
                  )}
                </div>
              ))}
              {fields.length === 0 && (
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ width: 120, height: 54.5, display: "inline-block" }}
                  onClick={() => append({ tag: "" })}
                >
                  Add tag
                </Button>
              )}
            </div>
          </div>
        </div>

        <LoadingButton
          loading={isLoading}
          disabled={isSameUserData}
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          type="submit"
          style={{ marginTop: 20, width: 300, height: 40 }}
        >
          Save
        </LoadingButton>
      </form>
    </section>
  );
};

export { ArticleForm };
