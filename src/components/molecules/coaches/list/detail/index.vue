<template>
  <el-row type="flex" justify="center">
    <el-col :xs="10" :sm="12" :md="10">
      <loading-spinner
        v-if="isLoading"
        :loading="isLoading"
        :loadingText="'Loading.....'"
        :idLoading="'loading'"
      />
      <el-card v-else-if="selectedCoach" :body-style="{ padding: '13px' }">
        <el-avatar
          shape="circle"
          :size="150"
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        />
        <div style="padding: 0 14px">
          <h2>{{ fullName }}</h2>
          <el-tag
            v-for="(area, index) in areas"
            :key="area"
            :type="types[index]"
            effect="dark"
          >
            {{ area }}
          </el-tag>
          <p>{{ selectedCoach.description || 'No description' }}</p>
          <div class="bottom">
            <time class="time">
              <h3>Cost: ${{ selectedCoach.hourlyRate }}/hour</h3>
            </time>
            <el-rate
              v-model="rate"
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
        <el-empty description="Profile not found">
          <el-button
            type="text"
            icon="el-icon-back"
            style="font-size: 20px"
            @click="$emit('go-back')"
          >
            Back
          </el-button>
        </el-empty>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { computed, onBeforeUpdate, ref } from 'vue';
import LoadingSpinner from '@/components/atoms/Loading.vue';

export default {
  components: { LoadingSpinner },
  props: ['selectedCoach', 'isLoading'],
  setup(props) {
    const types = ['success', 'warning', 'danger', 'primary', ''];

    const fullName = computed(
      () => `${props.selectedCoach.firstName} ${props.selectedCoach.lastName}`,
    );
    const areas = computed(() => props.selectedCoach.areas);
    const rating = computed(() => props.selectedCoach.rating);

    const rate = ref(0);

    onBeforeUpdate(() => {
      rate.value = rating.value;
    });

    return {
      fullName,
      areas,
      types,
      rating,
      rate,
    };
  },
};
</script>

<style lang="scss" scoped>
.time {
  color: $blue-100;
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

.el-tag {
  margin: 0 8px;
  font-size: 16px;
  padding: 0 15px;
}
</style>
