const rootQuery = {
  getTasks: (_,{}) => {
    return [{_id: "task"}];
  }
}
export default rootQuery;
