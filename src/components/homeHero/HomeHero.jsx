import css from './HomeHero.module.css';
const HomeHero = () => {
  return (
    <div className={css.homeHero}>
      <h1>Welcome to My Phonebook</h1>
      <h2>All Your Contacts in One Place</h2>
      <p>Log in or register to manage your contacts easily and securely.</p>
    </div>
  );
}
export default HomeHero;