import update from "immutability-helper";

/**
 *  it's ugly, but its alot faster than looping through object.keys
 * to programmatically make these deep_path objects
 */

export const PATH_MAX_DEPTH = 6;

export const pathMaxErrorMessage = ({
  update_path_length,
  PATH_MAX_DEPTH
}) => `Path length of ${update_path_length} is greater than
the max supported path length of ${PATH_MAX_DEPTH}. Update setDeep to support deeper paths.`;

export default function setDeepInPath(state, path = "", { command, data }) {
  const is_dot_path = path.search(".") > -1;
  const update_path = path.split(".");
  const update_path_length = is_dot_path ? update_path.length : 0;

  let deep_path;

  if (update_path_length > PATH_MAX_DEPTH) {
    throw new Error(
      pathMaxErrorMessage({ update_path_length, PATH_MAX_DEPTH })
    );
  }

  switch (update_path_length) {
    case 1:
      deep_path = {
        [update_path[0]]: { [command]: data }
      };
      break;
    case 2:
      deep_path = {
        [update_path[0]]: {
          [update_path[1]]: { [command]: data }
        }
      };
      break;
    case 3:
      deep_path = {
        [update_path[0]]: {
          [update_path[1]]: {
            [update_path[2]]: { [command]: data }
          }
        }
      };
      break;
    case 4:
      deep_path = {
        [update_path[0]]: {
          [update_path[1]]: {
            [update_path[2]]: {
              [update_path[3]]: { [command]: data }
            }
          }
        }
      };
      break;
    case 5:
      deep_path = {
        [update_path[0]]: {
          [update_path[1]]: {
            [update_path[2]]: {
              [update_path[3]]: {
                [update_path[4]]: { [command]: data }
              }
            }
          }
        }
      };
      break;
    case PATH_MAX_DEPTH:
      deep_path = {
        [update_path[0]]: {
          [update_path[1]]: {
            [update_path[2]]: {
              [update_path[3]]: {
                [update_path[4]]: {
                  [update_path[5]]: { [command]: data }
                }
              }
            }
          }
        }
      };
      break;
    default:
      // if path ommitted
      deep_path = { [command]: data };
  }

  return update(state, deep_path);
}

export function setDeep(state, { path, data, command = "$merge" }) {
  return setDeepInPath(state, path, {
    command,
    data
  });
}
