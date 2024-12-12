function Navigation({ handleRegClick, handleLoginClick }) {
  return (
    <div className="navigation">
      <button onClick={handleRegClick}>Sign up</button>
      <button onClick={handleLoginClick}>or Sign in</button>
    </div>
  );
}

export default Navigation;
