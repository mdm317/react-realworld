import "@testing-library/jest-dom";
import * as React from "react";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
// import testing utilities
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../src/Pages/Login";
import { Provider } from "react-redux";
import makeStore from "../src/Redux";
import { url } from "../src/db";
import { getToken } from "../src/Jwt/jwt";
import { ToastContainer } from "react-toastify";

const fakeUserResponse = {
  user: {
    id: 125577,
    email: "gpffh@a.a",
    createdAt: "2020-11-24T07:00:04.578Z",
    updatedAt: "2020-11-25T09:12:21.871Z",
    username: "gpffh1",
    bio: "c",
    image: null,
    token: "eyJ0",
  },
};
const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  window.localStorage.removeItem("token");
});
afterAll(() => server.close());
function renderWithProvidersAndToast(component: JSX.Element) {
  const store = makeStore();
  return render(
    <Provider store={store}>
      {component}
      <ToastContainer />
    </Provider>
  );
}
// test('아이디 또는 비밀번호가 틀렸을때 login 화면에 "email or password is invalid" 가 표시되게한다', async () => {
//   server.use(
//     rest.post(url + "/users/login", (req, res, ctx) => {
//       return res(
//         ctx.status(402),
//         ctx.json({ errors: { "email or password": ["is invalid"] } })
//       );
//     })
//   );
//   renderWithProvidersAndToast(<Login />);
//   // fill out the form

//   fireEvent.change(screen.getByPlaceholderText("Email"), {
//     target: { value: "email" },
//   });
//   fireEvent.change(screen.getByPlaceholderText("Password"), {
//     target: { value: "pass" },
//   });
//   fireEvent.click(screen.getByText(/Log in/i));
//   //error 메시지가 보이는지 확인
//   expect(await screen.findByText("email or password is invalid")).toBeVisible();
//   //   debug();
// });
// test("로그인 성공", async () => {
//   server.use(
//     rest.post(url + "/users/login", (req, res, ctx) => {
//       return res(ctx.status(200), ctx.json(fakeUserResponse));
//     })
//   );
//   renderWithProvidersAndToast(<Login />);

//   // fill out the form
//   fireEvent.change(screen.getByPlaceholderText("Email"), {
//     target: { value: "gpffh@a.a" },
//   });
//   fireEvent.change(screen.getByPlaceholderText("Password"), {
//     target: { value: "gpffh123" },
//   });
//   fireEvent.click(screen.getByRole("button", { name: /log in/i }));
//   //toast elem  이 생기는것을 찾는다.
//   const alert = await screen.findByRole("alert");
//   expect(alert).toHaveTextContent(/login success/i);
//   expect(getToken()).toEqual(fakeUserResponse.user.token);
// });
test("서버 에러", async () => {
  // mock the server error response for this test suite only.
  server.use(
    rest.post("/api/login", (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: "Internal server error" })
      );
    })
  );

  render(<Login />);

  // fill out the form
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "chuck" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "norris" },
  });

  fireEvent.click(screen.getByText(/submit/i));

  // wait for the error message
  const alert = await screen.findByRole("alert");

  expect(alert).toHaveTextContent(/internal server error/i);
  expect(window.localStorage.getItem("token")).toBeNull();
});

// test("handles server exceptions", async () => {
//   // mock the server error response for this test suite only.
//   server.use(
//     rest.post("/api/login", (req, res, ctx) => {
//       return res(
//         ctx.status(500),
//         ctx.json({ message: "Internal server error" })
//       );
//     })
//   );

//   render(<Login />);

//   // fill out the form
//   fireEvent.change(screen.getByLabelText(/username/i), {
//     target: { value: "chuck" },
//   });
//   fireEvent.change(screen.getByLabelText(/password/i), {
//     target: { value: "norris" },
//   });

//   fireEvent.click(screen.getByText(/submit/i));

//   // wait for the error message
//   const alert = await screen.findByRole("alert");

//   expect(alert).toHaveTextContent(/internal server error/i);
//   expect(window.localStorage.getItem("token")).toBeNull();
// });
