<template>
  <div
    class="flex flex-col w-full h-screen p-2 bg-gray-100"
  >
    <div class="flex w-full justify-end">
      <button @click="navigateToSettings">
        <img
          class="w-6"
          src="../assets/settings-gear.svg"
          alt=""
        />
      </button>
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
          currentRound.type
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
            currentRound.type === RoundType.Break ||
            currentRound.type === RoundType.LongBreak
              ? "Have a "
              : ""
          }}
          {{
            currentRound.type === RoundType.Focus
              ? currentRound.type
              : currentRound.type?.toLowerCase()
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
            v-if="!timerActive"
            class="w-8 h-8"
            src="../assets/button-play.svg"
            alt=""
          />
          <img
            v-if="timerActive"
            class="w-8 h-8"
            src="../assets/button-pause.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    <div
      class="
        flex
        w-full
        p-2
        justify-end
        space-x-1
        items-center
      "
    >
      <button @click="resetRounds">
        <img
          class="w-4 h-4"
          src="../assets/button-reset.svg"
          alt=""
        />
      </button>
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
import { EventBus } from "../util/EventBus";
import { TimerMutations } from "../store/timer/mutations";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      countdownTime: "00:00",
      currentRound: {
        type: RoundType.Focus,
        sequence: -1,
        time: 1,
      } as Round,
    });

    const timerActive = computed(
      () => store.getters.active
    );

    const rounds = computed(() => store.getters.rounds);

    const currentRoundIndex = computed(
      () => store.getters.currentTimerRoundIndex
    );

    watch(
      () => data.currentRound,
      () => {
        if (data.countdownTime === "00:00") {
          data.countdownTime =
            TimeConverter.elapsedTimeToString(
              store.getters.currentElapsedSeconds,
              data.currentRound.time
            );
        } else {
          data.countdownTime = TimeConverter.timeToString(
            data.currentRound.time
          );
        }
      }
    );

    watch(currentRoundIndex, (newRoundIndex) => {
      data.currentRound = rounds.value[newRoundIndex];
    });

    const toggleTimer = () => {
      if (!timerActive.value) {
        store.commit(
          TimerMutations.SET_TIMER_ACTIVE_STATE,
          true
        );
        EventBus.emit("startTimer", data.currentRound.time);
      } else {
        EventBus.emit("pauseTimer", null);
        store.commit(
          TimerMutations.SET_TIMER_ACTIVE_STATE,
          false
        );
      }
    };

    const setNextCurrentRound = () => {
      if (data.currentRound.sequence === 8) {
        store.commit(
          TimerMutations.SET_CURRENT_TIMER_ROUND_INDEX,
          0
        );
      } else {
        store.commit(
          TimerMutations.SET_CURRENT_TIMER_ROUND_INDEX,
          currentRoundIndex.value + 1
        );
      }
    };

    const skipRound = () => {
      EventBus.emit("stopTimer", null);
      store.commit(
        TimerMutations.SET_TIMER_ACTIVE_STATE,
        false
      );
      setNextCurrentRound();
    };

    const resetRounds = () => {
      EventBus.emit("resetTimer", null);
      store.commit(
        TimerMutations.SET_TIMER_ACTIVE_STATE,
        false
      );
      data.currentRound = rounds.value[0];
      store.commit(
        TimerMutations.SET_CURRENT_TIMER_ROUND_INDEX,
        0
      );
      data.countdownTime = TimeConverter.timeToString(
        data.currentRound.time
      );
    };

    const navigateToSettings = () => {
      router.push("/settings");
    };

    const listenForTickEvents = () => {
      EventBus.off("tick");
      EventBus.off("completedTimer");
      EventBus.on("tick", (elapsedSeconds: number) => {
        store.commit(
          TimerMutations.SET_CURRENT_ELAPSED_SECONDS,
          elapsedSeconds
        );
        data.countdownTime =
          TimeConverter.elapsedTimeToString(
            elapsedSeconds,
            data.currentRound.time
          );
      });

      EventBus.on("completedTimer", () => {
        skipRound();
      });
    };

    onMounted(() => {
      listenForTickEvents();
      data.currentRound =
        rounds.value[store.getters.currentTimerRoundIndex];
      data.countdownTime = TimeConverter.timeToString(
        data.currentRound.time
      );
      EventBus.emit("createTimer", data.currentRound.type);
    });

    return {
      ...toRefs(data),
      rounds,
      toggleTimer,
      skipRound,
      RoundType,
      timerActive,
      navigateToSettings,
      resetRounds,
    };
  },
});
</script>

<style scoped></style>
