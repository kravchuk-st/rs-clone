import * as noUiSlider from 'noUiSlider';

const healthScoreRangeFilter = document.getElementById('health-score') as noUiSlider.target;
const maxReadyTimeFilter = document.getElementById('max-ready-time') as noUiSlider.target;
const priceFilter = document.getElementById('price') as noUiSlider.target;
const caloriesFilter = document.getElementById('calories') as noUiSlider.target;
const carbohydratesFilter = document.getElementById('carbohydrates') as noUiSlider.target;
const fatsFilter = document.getElementById('fats') as noUiSlider.target;
const proteinsFilter = document.getElementById('proteins') as noUiSlider.target;

const filters = [
  {
    element: healthScoreRangeFilter,
    minRangeElement: document.getElementById('health-score-lower'),
    maxRangeElement: document.getElementById('health-score-higher'),
  },
  {
    element: maxReadyTimeFilter,
    minRangeElement: document.getElementById('time-lower'),
    maxRangeElement: document.getElementById('time-higher'),
  },
  {
    element: priceFilter,
    minRangeElement: document.getElementById('price-lower'),
    maxRangeElement: document.getElementById('price-higher'),
  },
  {
    element: caloriesFilter,
    minRangeElement: document.getElementById('calories-lower'),
    maxRangeElement: document.getElementById('calories-higher'),
  },
  {
    element: carbohydratesFilter,
    minRangeElement: document.getElementById('carbohydrates-lower'),
    maxRangeElement: document.getElementById('carbohydrates-higher'),
  },
  {
    element: fatsFilter,
    minRangeElement: document.getElementById('fats-lower'),
    maxRangeElement: document.getElementById('fats-higher'),
  },
  {
    element: proteinsFilter,
    minRangeElement: document.getElementById('proteins-lower'),
    maxRangeElement: document.getElementById('proteins-higher'),
  },
];

filters.forEach(filter => {
  if (filter.element) {
    noUiSlider.create(filter.element, {
      start: [Number(filter.minRangeElement?.innerHTML)],
      connect: false,
      step: 1,
      range: {
        min: Number(filter.minRangeElement?.innerHTML),
        max: Number(filter.maxRangeElement?.innerHTML),
      },
    });
  }
  const filterExtremums = [filter.minRangeElement, filter.maxRangeElement];
  (filter.element.noUiSlider as noUiSlider.API).on('update', function (values, handle) {
    (filterExtremums[handle] as HTMLElement).innerHTML = String(Math.round(values[handle] as number));
  });
});
