import { createSelector } from "reselect";

const getCanvasGroup = ({ canvas_group_ids, canvas_group }) => {
  return { canvas_group_ids, canvas_group };
};

export const makeGetCanvasGroup = () => {
  return createSelector(
    [getCanvasGroup],
    ({ canvas_group_ids, canvas_group }) => {
      return canvas_group_ids.map(canvas_group_id => {
        const { canvas_list, curr_canvas_id, user } = canvas_group[
          canvas_group_id
        ];
        return {
          canvas_group_id,
          canvas_list: canvas_list || [],
          curr_canvas_id,
          user
        };
      });
    }
  );
};
