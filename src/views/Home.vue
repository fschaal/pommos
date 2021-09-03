<template>
  <div
    class="flex flex-col w-full h-screen p-2 bg-gray-100"
  >
    <div class="flex w-full justify-end">
      <router-link to="settings">
        <img
          class="w-6"
          src="../assets/settings-gear.svg"
          alt=""
        />
      </router-link>
    </div>
    <div
      class="
        flex flex-col
        h-full
        justify-center
        items-center
      "
    >
      <div
        class="
          flex flex-col
          w-48
          h-48
          justify-center
          items-center
          rounded-full
          border-2 border-appText
        "
      >
        <h1 class="text-3xl text-appText">
          {{ countdownTime }}
        </h1>
        <span class="text-appText">{{
          currentRound.name
        }}</span>
      </div>
      <div
        class="
          flex flex-col
          w-full
          justify-center
          mt-5
          mb-5
        "
      >
        <div class="flex w-full justify-center mb-1">
          <span
            v-for="round in rounds"
            :key="round.sequence"
            class="
              w-3
              h-3
              bg-white
              rounded-full
              m-1
              shadow-md
            "
            :class="{
              'bg-appRoundRed':
                round.sequence < currentRound.sequence,
            }"
          />
        </div>
        <span
          class="w-full text-center text-xs text-appText"
          >{{
            currentRound.name === RoundType.Break ||
            currentRound.name === RoundType.LongBreak
              ? "Have a "
              : ""
          }}
          {{
            currentRound.name === RoundType.Focus
              ? currentRound.name
              : currentRound.name?.toLowerCase()
          }}
          for {{ currentRound.time }} min</span
        >
      </div>
      <div>
        <button
          type="button"
          class="
            flex
            items-center
            w-12
            h-12
            bg-appRed
            text-white text-base
            font-semibold
            px-4
            rounded-full
            mt-2
          "
          @click="toggleTimer"
        >
          <img
            v-if="!timerIsRunning"
            class="w-8 h-8"
            src="../assets/button-play.svg"
            alt=""
          />
          <img
            v-if="timerIsRunning"
            class="w-8 h-8"
            src="../assets/button-pause.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    <div class="flex w-full p-2 justify-end">
      <button @click="skipRound">
        <img
          class="w-4 h-4"
          src="../assets/button-next.svg"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Timer from "easytimer.js";
import { Round, RoundType } from "../models";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import TimeConverter from "../util/TimeConverter";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    const data = reactive({
      timer: new Timer(),
      timerIsRunning: false,
      countdownTime: "00:00",
      currentRound: {
        name: RoundType.Focus,
        sequence: 0,
        time: 0,
      } as Round,
    });

    const rounds = computed(() => store.getters.rounds);

    watch(
      () => data.currentRound,
      (newRound) => {
        data.countdownTime = TimeConverter.timeToString(
          newRound.time
        );
      }
    );

    const toggleTimer = () => {
      if (!data.timerIsRunning) {
        data.timer.start({
          countdown: true,
          startValues: { minutes: data.currentRound.time },
        });
        data.timerIsRunning = true;
      } else {
        data.timer.pause();
        data.timerIsRunning = false;
      }
    };

    const setNextCurrentRound = () => {
      if (data.currentRound.sequence === 8) {
        data.currentRound = rounds.value[0];
      } else {
        data.currentRound =
          rounds.value[data.currentRound.sequence];
      }
    };

    const skipRound = () => {
      data.timer.stop();
      data.timerIsRunning = false;
      setNextCurrentRound();
    };

    onMounted(() => {
      data.currentRound = rounds.value[0];
      data.timer.addEventListener("secondsUpdated", () => {
        data.countdownTime = `${data.timer
          .getTimeValues()
          .minutes.toString()}:${
          data.timer.getTimeValues().seconds.toString()
            .length === 1
            ? data.timer
                .getTimeValues()
                .seconds.toString()
                .padStart(2, "0")
            : data.timer.getTimeValues().seconds.toString()
        }`;
      });
      data.timer.addEventListener("targetAchieved", () => {
        if (data.currentRound.name === RoundType.Focus) {
          new Notification("Focus session ended", {
            body: "It's time for a break now.",
            badge: "/app-icon.png",
          });
        } else {
          new Notification("Break ended", {
            body: "Break ended so its time to focus again.",
            badge: "/app-icon.png",
          });
        }

        setNextCurrentRound();

        data.timerIsRunning = false;
      });
    });

    return {
      ...toRefs(data),
      rounds,
      toggleTimer,
      skipRound,
      RoundType,
    };
  },
});
</script>

<style scoped></style>
