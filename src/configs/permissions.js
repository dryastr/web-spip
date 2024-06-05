import { getAppStorage } from './cookie'

function checkPermissions(perm)
{
    const permissions = getAppStorage('permissions');
    if (!permissions){
        return false;
    }else{
        if (permissions.includes(perm)){
            return true;
        }else{
            return false;
        }
    }
}
export default checkPermissions;
