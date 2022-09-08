import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop' >SHOP</NavLink>
                {
                  currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink to='/auth' >SIGN IN</NavLink>)
                }
                <CartIcon />
            </NavLinks>
            {
              isCartOpen && (
                <CartDropdown />
              )
            }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
}

export default Navigation;