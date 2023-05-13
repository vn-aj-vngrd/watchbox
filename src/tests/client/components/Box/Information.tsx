// import { render, screen } from "@testing-library/react";
// import Information from "../../../../components/Box/Information";

// describe("Information component", () => {
//   const box = {
//     id: "string",
//     name: "string",
//     username: "testuser",
//     email: "string",
//     emailVerified: "2022-05-01T12:00:00Z",
//     image: "string",
//     isNewUser: false,
//     created_at: Date,
//     updated_at: Date,
//     boxes: [{
//       id: "string",
//       userId: "string",
//       boxTitle: "string",
//       isPublic: false,
//       created_at: "2022-05-01T12:00:00Z",
//       updated_at: "2022-05-02T12:00:00Z",
//     }],
//   };

//   it("displays the owner's username", () => {
//     render(<Information box={box} />);
//     const ownerElement = screen.getByText(/Owner:/);
//     expect(ownerElement).toHaveTextContent("testuser");
//   });

//   it("displays the box's creation time", () => {
//     render(<Information box={box} />);
//     const createdAtElement = screen.getByText(/Created at:/);
//     expect(createdAtElement).toHaveTextContent("May 1st 2022, 8:00:00 am");
//   });

//   it("displays the box's update time", () => {
//     render(<Information box={box} />);
//     const updatedAtElement = screen.getByText(/Updated at:/);
//     expect(updatedAtElement).toHaveTextContent("May 2nd 2022, 8:00:00 am");
//   });
// });
