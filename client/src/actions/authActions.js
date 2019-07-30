import axios from "axios";

//SET_USER
//REMOVE_USER

export function hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }


export const setUser = currUser => {
    return {
        type: "SET_USER",
        user: currUser
    }
};

export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

export const registerUser = async(body,dispatch) =>  {
    try{
        const res = await axios.post("/api/auth/Register",body);
        dispatch(setUser(res.data));

        return "SUCCESS";
    } catch (err) {
        return err.response.data;
    }
    
}
export const loginUser = async(body,dispatch) => {
    try{
        let res = await axios.post("/api/auth/Login",body);
        dispatch(setUser(res.data));
        return "SUCCESS";
        
    }catch (err) {
        return err.response.data;
    }
}
export const logoutUser = async(dispatch) => {

    try{
        dispatch(removeUser());
    } catch (err) {
        return err;
    }
}

