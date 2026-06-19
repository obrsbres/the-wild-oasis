import supabase from './supabase';

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: { data: { fullName: fullName, avatar: 'emti' } },
  });

  if (error) {
    console.error(error.message);
    throw new Error('Failed to signup a new user');
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error.message);
    throw new Error(`Login failed because of ${error.message}`);
  }

  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error.message);
    throw new Error(`Failed to get current user because of ${error.message}`);
  }
  console.log(data);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    throw new Error(`Logout failed because of ${error.message}`);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. Update password OR fullname -we dont update both on the same time because they are located in the same place
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  //2. Upload avatar image
  const fileName = `${data.user.id}`;
  const { error: storageError } = await supabase.storage
    .from('avatar-1')
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);
  //3. Update avatar in the user
  const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
    data: {
      avatar: `https://xxsoosyisoxoxumafovm.supabase.co/storage/v1/object/public/avatar-1/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message, error2.cause);

  return updatedUser;
  // https://xxsoosyisoxoxumafovm.supabase.co/storage/v1/object/public/avatar-1/about-1.jpg
}

export async function getThirdPartyLogin(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });
  console.log('getThirdPartyLogin', data, error);
}
