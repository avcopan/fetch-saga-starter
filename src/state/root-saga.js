import { takeEvery, put } from "redux-saga/effects";

function* setElementsSaga(action) {
  console.log("I'm in setElementSaga!");
}

// this is the saga that will watch for actions
function* rootSaga() {
  yield takeEvery("SET_ELEMENTS", setElementsSaga);
  yield takeEvery("FETCH_ELEMENTS", fetchElementsSaga);
}

function* fetchElementsSaga() {
  console.log("I'm in fetchElementSaga!");
  try {
    const response = yield fetch('/api/element');
    const elements = yield response.json();
    yield put({ type: 'SET_ELEMENTS', payload: elements});
  } catch(error) {
    console.error("Fetching elements failed:", error);
  }
}

export default rootSaga;
