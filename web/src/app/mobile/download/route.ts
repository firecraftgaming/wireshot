import {IOS_SHORTCUT} from '../../../lib/constants';

export function GET() {
    return Response.redirect(IOS_SHORTCUT, 301);
}
