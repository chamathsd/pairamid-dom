import _ from "lodash";
export const cluster = (arr, tmp = [], result = []) => (
  (result = arr.reduce(
    (acc, c, i) =>
      !tmp.length || c === arr[i - 1] + 1
        ? (tmp.push(c), acc)
        : (acc.push(tmp), (tmp = [c]), acc),
    []
  )),
  tmp.length ? (result.push(tmp), result) : result
);

export const pairStats = (sessions) => {
  console.log("sessions: ", sessions);
  const pairs = _.groupBy(sessions, (p) =>
    p.team_members.map((u) => u.username)
  );
  return _.flatten(
    Object.entries(pairs).flatMap(([_, values]) =>
      cluster(values.map((v) => v.streak))
    )
  );
};
