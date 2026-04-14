// TestComponent.jsx - सिर्फ debugging के लिए
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../utils/fetchCategory";
import { setLoadingCategory, setAllCategory } from "../redux/productSlice";

const TestComponent = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);

  useEffect(() => {
    console.log("Testing category fetch...");
    fetchCategory(dispatch, setLoadingCategory, setAllCategory);
  }, [dispatch]);

  return (
    <div>
      <h2>Redux State Debug</h2>
      <pre>{JSON.stringify(productState, null, 2)}</pre>
    </div>
  );
};

export default TestComponent;
