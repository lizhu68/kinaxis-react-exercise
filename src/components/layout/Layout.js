import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div className="container">
      <MainNavigation />
      <div className="jumbotron jumbotron-fluid">
        <div className="container row">
          <h1 className="display-4">Best Parking Finder</h1>
          <p className="lead">
            Reserve your parking online and SAVE your time.
          </p>
          <p className="lead">
            You could click fast reserve and quickly reserve a lot, or click on
            the parking name to the details page to make a lot selection.
          </p>
        </div>
      </div>
      <main className="container bg-light">{props.children}</main>
    </div>
  );
};

export default Layout;
