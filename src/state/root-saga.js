import { takeEvery, put } from "redux-saga/effects";

function* setElementsSaga(action) {
  console.log("I'm in setElementSaga! Action:", action);
}

function* fetchElementsSaga() {
  console.log("I'm in fetchElementSaga!");
  try {
    const response = yield fetch("/api/element");
    const elements = yield response.json();
    yield put({ type: "SET_ELEMENTS", payload: elements });
  } catch (error) {
    console.error("Fetching elements failed:", error);
  }
}

function* addElementSaga(action) {
  console.log("I'm in addElementSaga!");
  try {
    yield fetch("/api/element", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    yield put({ type: "FETCH_ELEMENTS" });
  } catch (error) {
    console.error("Adding an element failed:", error);
  }
}

// this is the saga that will watch for actions
function* rootSaga() {
  yield takeEvery("SET_ELEMENTS", setElementsSaga);
  yield takeEvery("FETCH_ELEMENTS", fetchElementsSaga);
  yield takeEvery("ADD_ELEMENT", addElementSaga);
}

export default rootSaga;
