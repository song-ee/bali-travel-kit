import {requireChatGPTUser} from './chatgpt-auth';
import TripApp from './TripApp';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/');return <TripApp/>}
