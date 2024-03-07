<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="8" lg="8" sm="8">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1 class="text-center">Admin Panel</h1>
            <VForm @submit.prevent="submit" class="mt-7">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email">User</label>
                <VTextField
                  :rules="[ruleRequired]"
                  v-model="user"
                  prepend-inner-icon="fluent:person-24-regular"
                  id="user"
                  name="user"
                  type="user"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password">Password</label>
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="password"
                  prepend-inner-icon="fluent:password-20-regular"
                  id="password"
                  name="password"
                  type="password"
                />
              </div>
              <div class="mt-5">
                <VBtn type="submit" block min-height="44" class="gradient primary">SIGN IN</VBtn>
              </div>
            </VForm>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
const user = ref("");
const password = ref("");

const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const submit = async () => {};
</script>
