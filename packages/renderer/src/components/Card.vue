<script setup>
import interact from "interactjs";
import { mainStore } from "../stores/mainStore";

const store = mainStore();

defineProps({
  card: {
    type: Object,
    required: true,
  },
});

interact(".card")
  .on("dragstart", function (event) {
    store.incrementZ();

    event.target.style.zIndex = store.currentZ;
  })
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true,
      }),
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end(event) {
        // var textEl = event.target.querySelector("p");
        // textEl &&
        //   (textEl.textContent =
        //     "moved a distance of " +
        //     Math.sqrt(
        //       (Math.pow(event.pageX - event.x0, 2) +
        //         Math.pow(event.pageY - event.y0, 2)) |
        //         0
        //     ).toFixed(2) +
        //     "px");
      },
    },
  });

interact(".dropzone").dropzone({
  overlap: 0.75,
  ondropactivate: function (event) {
    // event.target.classList.add("border-dashed");
    // event.target.classList.add("border-2");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    if (dropzoneElement.classList.contains("saveDropZone")) {
      dropzoneElement.classList.add("bg-green-200");
    } else {
      dropzoneElement.classList.add("bg-red-300");
    }
    draggableElement.classList.add("can-drop");
  },
  ondragleave: function (event) {
    // remove the drop feedback style

    if (event.target.classList.contains("saveDropZone")) {
      event.target.classList.remove("bg-green-200");
    } else {
      event.target.classList.remove("bg-red-300");
    }

    event.relatedTarget.classList.remove("can-drop");
  },
  ondrop: function (event) {
    var card = JSON.parse(event.relatedTarget.getAttribute("data-card"));

    if (event.target.classList.contains("saveDropZone")) {
      store.addToSavedCards(card);
      event.target.classList.remove("bg-green-200");
    } else {
      store.removeFromCards(card._id);
      event.target.classList.remove("bg-red-300");
    }
  },
  ondropdeactivate: function (event) {
    // event.target.classList.remove("border-dashed");
    // event.target.classList.remove("border-2");
  },
});

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
</script>

<template>
  <div
    class="card p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-500 flex flex-col justify-center"
  >
    <h3
      class="cardTitle mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      "{{ card.content }}"
    </h3>
    <p class="font-normal text-gray-700 dark:text-gray-400">
      - {{ card.author }}
    </p>
  </div>
</template>

<style scoped>
.card {
  width: 19em;
  height: 25em;
  box-sizing: border-box;
  touch-action: none;
}
</style>
