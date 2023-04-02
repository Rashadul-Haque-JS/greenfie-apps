import Users from "@/server/models/users";
import { addMinutes } from "date-fns";

export const removeUnconfirmedUsers = async () => {
  const tenMinutesAgo = addMinutes(new Date(), -1);
  const confirmedUsersAfterCutoff = await Users.find({
    confirmed: true,
    createdAt: { $gte: tenMinutesAgo },
  });
  
  if (confirmedUsersAfterCutoff.length > 0) {
    console.log(`Skipping removal of ${confirmedUsersAfterCutoff.length} confirmed users created after cutoff time`);
    return;
  }

  const unconfirmedUsers = await Users.find({
    confirmed: false,
    createdAt: { $lt: tenMinutesAgo },
  });

  if (unconfirmedUsers.length > 0) {
    console.log(`Removing ${unconfirmedUsers.length} unconfirmed users`);
    await Users.deleteMany({
      confirmed: false,
      createdAt: { $lt: tenMinutesAgo },
    });
  } else {
    console.log('No unconfirmed users found for the time interval');
  }
};
