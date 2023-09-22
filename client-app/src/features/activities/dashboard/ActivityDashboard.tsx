import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import { ActivityFilters } from "./ActivityFilters";
import { ActivityList } from "./ActivityList";
import { ActivityListItemPlaceholder } from "./ActivityListItemPlaceholder";

export const ActivityDashboard = observer(() => {
  const { activityStore } = useStore();
  const { loadActivities, pagination, setPagingParams, activityRegistry } =
    activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      <Grid.Column width="10">
        {activityStore.loadingInitial &&
        activityRegistry.size === 0 &&
        !loadingNext ? (
          <div>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </div>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
