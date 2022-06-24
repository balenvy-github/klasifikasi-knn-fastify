import { FastifyRequest, FastifyReply } from 'fastify';
import natural from 'natural';
import StopWord from 'stopword';
import translate from '@iamtraction/google-translate';
import { ReviewTypes } from '../schemas/schema_types/review.schemas.types';

const tokenizer = new natural.WordTokenizer();
const Sentiment = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;

export default async function reviewHandler(request: FastifyRequest<{Body: ReviewTypes}>, reply: FastifyReply) {
  try {
    const { review } = request.body;
    const reviewEn = await (await translate(review, { to: 'en' })).text;
    console.log(reviewEn);

    const casedReview = reviewEn.toLowerCase();
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
    const filteredReview = StopWord.removeStopwords(tokenizedReview);

    const analyzer = new Sentiment('English', stemmer, 'afinn');
    const analysis = await analyzer.getSentiment(filteredReview);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      analysis,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
