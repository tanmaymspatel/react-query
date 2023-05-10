import { Routes, Route } from "react-router-dom";
import Query from "../../pages/Query";
import InfiniteQuery from "../../pages/InfiniteQuery";
import PageNotFound from "./PageNotFound";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Query />} />
            <Route path="/simple-query" element={<Query />} />
            <Route path="/infinite-query" element={<InfiniteQuery />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default Routing;
