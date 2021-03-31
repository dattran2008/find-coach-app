<template>
  <h1>Profile</h1>
  <el-row type="flex" justify="center">
    <el-col :xs="10" :sm="12" :md="10">
      <el-card v-if="selectedCoach" :body-style="{ padding: '13px' }">
        <el-avatar
          shape="circle"
          :size="150"
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        />
        <div style="padding: 0 14px;">
          <h2>{{ fullName }}</h2>
          <el-tag
            v-for="(area, index) in areas"
            :key="area"
            :type="types[index]"
            effect="dark"
            class="tag-group"
          >
            {{ area }}
          </el-tag>
          <p>{{ selectedCoach.description }}</p>
          <div class="bottom">
            <time class="time">
              <h3>Cost: ${{ selectedCoach.hourlyRate }}/hour</h3>
            </time>
            <el-rate
              v-model="selectedCoach.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
            >
            </el-rate>
          </div>
        </div>
      </el-card>
      <el-card v-else>
        <el-empty description="Profile not found" :image="circleUrl">
          <el-button type="text" icon="el-icon-back" style="font-size: 20px">
            Back
          </el-button>
        </el-empty>
      </el-card>
    </el-col>
  </el-row>
  <el-divider>
    <i class="el-icon-star-on"></i>
    <i class="el-icon-star-on"></i>
    <i class="el-icon-star-on"></i>
  </el-divider>
  <div class="contact" v-if="selectedCoach">
    <h1 class="title">Contact Us</h1>
    <h3>Interested? Reach out now</h3>
    <router-link :to="contactLink()" tag="button">
      <el-button plain>Start Here</el-button>
    </router-link>
  </div>
  <router-view></router-view>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const types = ['success', 'info', 'danger', 'warning', ''];

    const selectedCoach = store.getters['coaches/coaches'].find(
      (coach) => coach.id === props.id,
    );

    const fullName = computed(
      () => `${selectedCoach.firstName} ${selectedCoach.lastName}`,
    );
    const areas = computed(() => selectedCoach.areas);

    const contactLink = () => `${route.path}/contact`;

    return {
      selectedCoach,
      fullName,
      areas,
      types,
      contactLink,
    };
  },
};
</script>

<style lang="scss" scoped>
.time {
  color: #71ace8;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.tag-group {
  margin: 0 8px;
  font-size: 16px;
  padding: 0 15px;
}

.contact {
  margin-bottom: 30px;

  .title {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 40px;
    line-height: 1em;
    font-weight: 700;
  }

  a {
    button {
      text-transform: uppercase;
      padding: 1.19rem 1.37rem;
      min-width: 270px;
      letter-spacing: 0.1em;
      color: #000;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
