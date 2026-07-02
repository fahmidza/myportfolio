---
title: Food Image Classification Using Deep Learning
date: 2025-04-27
description: This project builds an image classification system to automatically recognize 11 food categories using a deep learning approach, ranging from a simple CNN to transfer learning with Xception.
tags:
  - Deep Learning
  - Image Classification
  - Python
report_files:
  - label: Full notebook
    file: /files/Food Image Classification.html
---

## Background

Recognizing food from images has many practical application potentials, such as helping delivery apps identify menu items, supporting health apps in tracking users' food intake, or speeding up product categorization on culinary e-commerce platforms . This project was created to explore how a computer vision model can solve this problem end-to-end, from data exploration to a deployment-ready model.

## Dataset

The dataset used is **Food-11**, downloaded from Kaggle, containing a total of 11,000 images evenly distributed across 11 food classes: apple pie, cheesecake, chicken curry, french fries, fried rice, hamburger, hot dog, ice cream, omelette, pizza, and sushi .

![](/img/20260702-154204.png "Image Dataset")

## Data Preparation

- The original train and test data were merged back together, then re-split using a stratified approach into 80% training data and 20% test data to keep the distribution of each class balanced
- Final split result: 8,800 images for training data and 2,200 images for test data, with 800 and 200 images per class, respectively
- From the training data, a further split was made into a training generator (7,040 images) and a validation generator (1,760 images) using `ImageDataGenerator`
- Each image was normalized (rescale 1/255) and automatically padded to a uniform size of 512x512 pixels before being fed into the model

## Model Architecture

Two model approaches were built and compared in this project.

## Model 1: Simple CNN

A basic model based on Conv2D, BatchNormalization, MaxPooling, GlobalAveragePooling, and Dropout, built from scratch with only 699 total parameters . This model was used as a baseline to observe the performance of a lightweight architecture before moving on to transfer learning.

## Model 2: Transfer Learning with Xception

The second model uses an Xception backbone pretrained on ImageNet, with the last 30 layers fine-tuned, plus several custom Conv2D, Dense, and Dropout layers added on top, resulting in a total of approximately 22.2 million parameters . This approach proved to be far more effective at capturing complex visual features from food images.

## Training Process

## Model 1 (CNN Baseline)

Trained for 5 epochs with the Adam optimizer, this model only achieved a validation accuracy of around 18% , showing that a simple architecture without pretrained features is insufficient for this complex 11-class classification task.

![](/img/20260702-154400.png "Training and Validation Accuracy - Model 1")

![](/img/20260702-154453.png "Training and Validation Loss - Model 1")

![](/img/20260702-154539.png "Classification Report - Model 1")

## Model 2 (Xception Fine-Tuning)

With a learning rate of 0.0001, EarlyStopping, and ReduceLROnPlateau, this model showed significant improvement each epoch, from a training accuracy of 38% in the first epoch to around 97% by the fifth epoch, with the best validation accuracy reaching approximately 90% before training was automatically stopped by EarlyStopping .

![](/img/20260702-154603.png "Training and Validation Accuracy - Model 2")

![](/img/20260702-154607.png "Training and Validation Loss - Model 2")

![](/img/20260702-154619.png "Classification Report - Model 2")

## Results and Insights

- Transfer learning with Xception far outperformed the custom CNN, confirming the advantage of pretrained features for medium-scale image datasets like Food-11
- L2 regularization and layered Dropout on the Dense layers helped control overfitting during fine-tuning
- The EarlyStopping and ReduceLROnPlateau callbacks played a key role in maintaining training efficiency without wasting time on unproductive epochs

## Deployment

The final model was converted using the `tensorflowjs` library so it can run directly on the client side (browser) without requiring a separate inference server , opening up possibilities for lightweight integration into static web applications and progressive web apps.

## Testing (Inference)

To validate real-world usability beyond the training and validation metrics, the fine-tuned Xception model was tested on external food images sourced outside the original Food-11 dataset, simulating how the model would perform on unseen, real-world inputs.

![](/img/20260702-154805.png)

![](/img/20260702-154853.png)
