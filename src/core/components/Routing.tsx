import { Routes, Route } from "react-router-dom";
import Query from "../../pages/Query";
import InfiniteQuery from "../../pages/InfiniteQuery";
import PageNotFound from "./PageNotFound";
import UserDetails from "../../components/UserDetails";
import ParallelQuery from "../../pages/ParallelQuery";
import DependentQuery from "../../pages/DependentQuery";
import PaginatedQuery from "../../pages/PaginatedQuery";
import Mutation from "../../pages/Mutation";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Query />} />
            <Route path="/simple-query-users" element={<Query />} />
            <Route path="/simple-query-users/:userId" element={<UserDetails />} />
            <Route path="/infinite-query-users" element={<InfiniteQuery />} />
            <Route path="/parallel-query" element={<ParallelQuery />} />
            <Route path="/dependent-query" element={<DependentQuery email="tanmay@gmail.com" />} />
            <Route path="/paginated-query" element={<PaginatedQuery />} />
            <Route path="/mutation" element={<Mutation />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default Routing;
